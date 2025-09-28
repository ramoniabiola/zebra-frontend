import { Camera, X } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

const Step4_UploadImages = ({
  formData,
  handleFileChange,
  handleRemoveImage,
  handleImageDrop,
  handleImageReorder, // New prop for reorderings
  errors,
  showError,
  imagesUploaded,
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragCounter = useRef(0);

  const boxes = useRef([]);
  const rafId = useRef(null);

  // Touch/Mobile drag states
  const [touchStartIndex, setTouchStartIndex] = useState(null);
  const [touchCurrentIndex, setTouchCurrentIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const touchTimer = useRef(null);
  const ghost = useRef(null);

  
  // Accessibility
  const handleKeyReorder = (e, index) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setDraggedIndex(index);
    }
    if (draggedIndex !== null) {
      if (e.key === "ArrowLeft" && index > 0) {
        handleImageReorder(draggedIndex, index - 1);
      }
      if (e.key === "ArrowRight" && index < formData.images.length - 1) {
        handleImageReorder(draggedIndex, index + 1);
      }
    }
  };

  // Desktop drop functions
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      handleImageDrop(imageFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  // Desktop drag functions
  const handleImageDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
  };

  const handleImageDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleImageDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    dragCounter.current = 0;
  };

  const handleImageDragDrop = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      if (handleImageReorder) {
        handleImageReorder(draggedIndex, dropIndex);
      }
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleImageDragEnter = (e, index) => {
    e.preventDefault();
    dragCounter.current++;
    setDragOverIndex(index);
  };

  const handleImageDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOverIndex(null);
    }
  };

  // Touch drag functions
  const handleTouchStart = (e, index) => {
    const touch = e.touches[0];
    setDragStartPos({ x: touch.clientX, y: touch.clientY });
    setTouchStartIndex(index);

    // Cache bounding boxes
    boxes.current = Array.from(document.querySelectorAll("[data-image-index]")).map(
      (el, i) => ({
        index: i,
        rect: el.getBoundingClientRect(),
      })
    );

    // Ghost preview
    ghost.current = e.currentTarget.cloneNode(true);
    ghost.current.style.position = "fixed";
    ghost.current.style.pointerEvents = "none";
    ghost.current.style.opacity = "0.7";
    ghost.current.style.zIndex = 9999;
    ghost.current.style.width = `${e.currentTarget.offsetWidth}px`;
    ghost.current.style.height = `${e.currentTarget.offsetHeight}px`;
    document.body.appendChild(ghost.current);

    touchTimer.current = setTimeout(() => {
      setIsDragging(true);
      setDraggedIndex(index);
    }, 300);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];

    if (ghost.current) {
      ghost.current.style.left = `${touch.clientX - 40}px`;
      ghost.current.style.top = `${touch.clientY - 40}px`;
    }

    if (!isDragging) {
      const deltaX = Math.abs(touch.clientX - dragStartPos.x);
      const deltaY = Math.abs(touch.clientY - dragStartPos.y);
      if (deltaX > 10 || deltaY > 10) clearTimeout(touchTimer.current);
      return;
    }

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(() => {
        const overBox = boxes.current.find(
          (b) =>
            touch.clientX >= b.rect.left &&
            touch.clientX <= b.rect.right &&
            touch.clientY >= b.rect.top &&
            touch.clientY <= b.rect.bottom
        );
        if (overBox && overBox.index !== draggedIndex) {
          setTouchCurrentIndex(overBox.index);
          setDragOverIndex(overBox.index);
        }
        rafId.current = null;
      });
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(touchTimer.current);
    ghost.current?.remove();
    ghost.current = null;

    if (isDragging && touchCurrentIndex !== null && touchCurrentIndex !== draggedIndex) {
      if (handleImageReorder) {
        handleImageReorder(draggedIndex, touchCurrentIndex);
      }
    }

    setIsDragging(false);
    setTouchStartIndex(null);
    setTouchCurrentIndex(null);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };


  const shouldShowError = showError && errors?.images;

  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-1.5">
          Upload Property Images
        </h2>
        <p className="text-gray-600">
          Add photos to showcase your property (5 minimum and 15 maximum images
          required)
        </p>
      </div>

      {/* UPLOAD BOX */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          shouldShowError
            ? "border-red-300 bg-red-50"
            : "border-gray-300 hover:border-cyan-400 hover:bg-cyan-50/30"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
              shouldShowError
                ? "bg-gradient-to-r from-red-400 to-red-500"
                : "bg-gradient-to-r from-cyan-400 to-cyan-500"
            }`}
          >
            <Camera className="w-8 h-8 text-white" />
          </div>
          <label className="cursor-pointer group">
            <span
              className={`font-semibold text-lg group-hover:underline ${
                shouldShowError
                  ? "text-red-600 hover:text-red-700"
                  : "text-cyan-600 hover:text-cyan-700"
              }`}
            >
              Choose images
            </span>
            <span className="text-gray-500 text-lg"> or drag and drop</span>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="text-sm text-gray-400 mt-2">
            PNG, JPG up to 10MB each
          </p>
          {shouldShowError && (
            <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 font-medium">
                {errors.images}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Image Counter */}
      <div className="flex flex-col gap-3 items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Selected Images ({formData.images.length}/5 minimum)
        </h3>
        <div className={`px-3 py-2 rounded-full text-sm font-medium ${
          imagesUploaded 
            ? 'bg-green-100 text-green-700  tracking-wider'
            : formData.images.length > 15
            ? 'bg-red-100 text-red-700 tracking-wider'
            :  formData.images.length >= 5 
            ? 'bg-sky-100 text-sky-700  tracking-wider'
            : 'bg-orange-100 text-orange-700'
        }`}>
          { 
            imagesUploaded 
            ? 'Images Uploaded'
            : formData.images.length > 15
            ? 'Exceeded maximum limit!' 
            : formData.images.length >= 5 
            ? 'Ready to upload' 
           
            : `${5 - formData.images.length} more needed`
          }
        </div>
      </div>

      {/* IMAGE GRID */}
      {formData.images.length > 0 && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {formData.images.map((file, idx) => {
              const isFile = file instanceof File;
              const isDraggedOver = dragOverIndex === idx && (draggedIndex !== idx || touchCurrentIndex !== idx);
              const isDraggingThis = draggedIndex === idx || (isDragging && touchStartIndex === idx);

              return (
                <motion.div
                  layout
                  key={idx}
                  data-image-index={idx}
                  role="listitem"
                  aria-grabbed={draggedIndex === idx}
                  aria-dropeffect={
                    dragOverIndex === idx ? "move" : "none"
                  }
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyReorder(e, idx)}
                  className={`relative group cursor-pointer transition-all duration-200 ${
                    isDraggingThis ? "opacity-50 scale-95 z-10" : ""
                  } ${isDraggedOver ? "scale-105" : ""}`}
                  draggable={!isTouchDevice}
                  onDragStart={
                    !isTouchDevice
                      ? (e) => handleImageDragStart(e, idx)
                      : undefined
                  }
                  onDragOver={
                    !isTouchDevice
                      ? (e) => handleImageDragOver(e, idx)
                      : undefined
                  }
                  onDragEnter={
                    !isTouchDevice
                      ? (e) => handleImageDragEnter(e, idx)
                      : undefined
                  }
                  onDragLeave={
                    !isTouchDevice
                      ? (e) => handleImageDragLeave(e, idx)
                      : undefined
                  }
                  onDrop={
                    !isTouchDevice
                      ? (e) => handleImageDragDrop(e, idx)
                      : undefined
                  }
                  onDragEnd={!isTouchDevice ? handleImageDragEnd : undefined}
                  onTouchStart={
                    isTouchDevice ? (e) => handleTouchStart(e, idx) : undefined
                  }
                  onTouchMove={
                    isTouchDevice ? (e) => handleTouchMove(e) : undefined
                  }
                  onTouchEnd={
                    isTouchDevice ? (e) => handleTouchEnd(e) : undefined
                  }
                >
                  {isFile ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${idx}`}
                      className="w-full h-32 object-cover rounded-xl border border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-200"
                    />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center text-xs text-gray-500 border border-gray-200 rounded-xl bg-gray-50">
                      Invalid image file
                    </div>
                  )}

                  {/* Remove Button */}
                  {imagesUploaded ? null : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(idx);
                      }}
                      type="button"
                      className={`absolute -top-2 -right-2 w-8 h-8 bg-rose-500/70 hover:bg-rose-600/70 text-white rounded-full 
                        flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 
                        cursor-pointer transition-all duration-200 ${
                          isTouchDevice
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  {/* Index indicator */}
                  <div className="absolute top-2 left-2 w-6 h-6 bg-black/50 text-white text-xs rounded-full flex items-center justify-center">
                    {idx + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {formData.images.length > 0 && (
            <div className="mt-8 p-4 bg-sky-50 border border-sky-200 rounded-xl">
              <p className="text-sm text-sky-700 leading-6">
                <span className="font-medium"><b>Tip:</b></span> The first image will be your main listing photo. 
                To rearrange images, {isTouchDevice ? 'press and hold an image for half a second, then drag it onto another image to swap their positions' : 'simply drag and drop one image onto another to swap their positions'}. 
                You can also remove and re-add images if needed. Make sure all images are clear and high-quality before clicking <b>"Upload"</b>. Note that images can no longer be updated or position rearranged when successfully uploaded.
              </p>
            </div>
          )} 
        </div>        
      )}

      {formData.images.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No images selected yet</p>
          <p className="text-sm text-gray-400 mt-1">Choose at least 5 images to continue</p>
        </div>
      )}      
    </div>
  );
};

export default Step4_UploadImages;
