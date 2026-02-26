import { Camera, X, ImagePlus, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";


const Step4_UploadImages = ({
  formData,
  handleFileChange,
  handleRemoveImage,
  handleImageDrop,
  handleImageReorder,
  errors,
  showError,
  imagesUploaded,
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragCounter = useRef(0);
  const boxes = useRef([]);
  const rafId = useRef(null);

  const [touchStartIndex, setTouchStartIndex] = useState(null);
  const [touchCurrentIndex, setTouchCurrentIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const touchTimer = useRef(null);
  const ghost = useRef(null);

  const handleKeyReorder = (e, index) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setDraggedIndex(index);
    }
    if (draggedIndex !== null) {
      if (e.key === "ArrowLeft" && index > 0) handleImageReorder(draggedIndex, index - 1);
      if (e.key === "ArrowRight" && index < formData.images.length - 1) handleImageReorder(draggedIndex, index + 1);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    if (files.length > 0) handleImageDrop(files);
  };

  const handleDragOver = (e) => e.preventDefault();

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
    if (draggedIndex !== null && draggedIndex !== dropIndex && handleImageReorder) {
      handleImageReorder(draggedIndex, dropIndex);
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
    if (dragCounter.current === 0) setDragOverIndex(null);
  };

  const handleTouchStart = (e, index) => {
    const touch = e.touches[0];
    setDragStartPos({ x: touch.clientX, y: touch.clientY });
    setTouchStartIndex(index);
    boxes.current = Array.from(document.querySelectorAll("[data-image-index]")).map((el, i) => ({
      index: i,
      rect: el.getBoundingClientRect(),
    }));
    ghost.current = e.currentTarget.cloneNode(true);
    ghost.current.style.cssText = `position:fixed;pointer-events:none;opacity:0.7;z-index:9999;width:${e.currentTarget.offsetWidth}px;height:${e.currentTarget.offsetHeight}px;`;
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
          (b) => touch.clientX >= b.rect.left && touch.clientX <= b.rect.right &&
                 touch.clientY >= b.rect.top && touch.clientY <= b.rect.bottom
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
    if (isDragging && touchCurrentIndex !== null && touchCurrentIndex !== draggedIndex && handleImageReorder) {
      handleImageReorder(draggedIndex, touchCurrentIndex);
    }
    setIsDragging(false);
    setTouchStartIndex(null);
    setTouchCurrentIndex(null);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const shouldShowError = showError && errors?.images;
  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const count = formData.images.length;
  const statusConfig = imagesUploaded
    ? { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", icon: CheckCircle, label: "Images Uploaded Successfully" }
    : count > 15
    ? { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", icon: AlertCircle, label: "Exceeded maximum limit!" }
    : count >= 5
    ? { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-700", icon: CheckCircle, label: "Ready to upload" }
    : { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", icon: AlertCircle, label: `${5 - count} more image${5 - count !== 1 ? "s" : ""} needed` };

  const StatusIcon = statusConfig.icon;

  return (
    <div className="flex flex-col gap-5">

      {/* ── SECTION HEADER ── */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-900 px-5 py-7 md:px-7 shadow-lg">
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-6 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute top-4 right-20 w-8 h-8 rounded-full bg-cyan-500/40" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow-md">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-cyan-300 mb-1.5 bg-white/10 px-2.5 py-0.5 rounded-full">
              Step 4 of 4
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">Upload Property Images</h2>
            <p className="text-cyan-100/70 text-xs md:text-sm mt-0.5">Minimum 5, maximum 15 high-quality photos</p>
          </div>
        </div>
      </div>


      {/* ── UPLOAD DROPZONE CARD ── */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-100/80 flex items-center justify-center flex-shrink-0">
            <ImagePlus className="w-3.5 h-3.5 text-cyan-600" />
          </div>
          <h3 className="font-semibold text-gray-950 text-base md:text-lg">
            Select Images <span className="text-rose-500">*</span>
          </h3>
        </div>
        <div className="p-5 md:p-6">
          <div
            className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all duration-200 ${
              shouldShowError
                ? "border-red-300 bg-red-50"
                : "border-stone-200 hover:border-cyan-400 hover:bg-cyan-50/30"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                shouldShowError ? "bg-red-100" : "bg-cyan-50"
              }`}>
                <Camera className={`w-6 h-6 ${shouldShowError ? "text-red-500" : "text-cyan-600"}`} />
              </div>

              <label className="cursor-pointer">
                <span className={`font-semibold text-sm md:text-base underline-offset-2 hover:underline ${
                  shouldShowError ? "text-red-600" : "text-cyan-700"
                }`}>
                  Choose images
                </span>
                <span className="text-gray-400 text-sm md:text-base"> or drag and drop</span>
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <p className="text-xs text-gray-400">PNG, JPG — up to 10MB each</p>

              {shouldShowError && (
                <div className="mt-1 flex items-center gap-2 px-3 py-2 bg-red-100 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-700 font-medium">{errors.images}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* ── STATUS CARD ── */}
      <div className={`rounded-2xl border ${statusConfig.border} ${statusConfig.bg} px-5 py-4 flex items-center justify-between gap-3`}>
        <div className="flex items-center gap-3">
          <StatusIcon className={`w-5 h-5 flex-shrink-0 ${statusConfig.text}`} />
          <div>
            <p className={`text-sm md:text-base font-semibold ${statusConfig.text}`}>{statusConfig.label}</p>
            <p className={`text-xs mt-0.5 ${statusConfig.text} opacity-75`}>
              {count} of 15 maximum images selected
            </p>
          </div>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusConfig.border} ${statusConfig.text} bg-white/60 flex-shrink-0`}>
          {count} / 15
        </span>
      </div>


      {/* ── IMAGE GRID CARD ── */}
      {count > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100/80 flex items-center justify-center flex-shrink-0">
                <Camera className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <h3 className="font-semibold text-gray-950 text-base md:text-lg">Selected Photos</h3>
            </div>
            <span className="text-xs bg-stone-200 text-slate-600/70 px-2.5 py-1 rounded-full font-medium flex-shrink-0">
              {count} image{count !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="p-4 md:p-5">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
                    aria-dropeffect={dragOverIndex === idx ? "move" : "none"}
                    tabIndex={0}
                    onKeyDown={(e) => handleKeyReorder(e, idx)}
                    className={`relative group cursor-grab transition-all duration-200 ${
                      isDraggingThis ? "opacity-50 scale-95 z-10" : ""
                    } ${isDraggedOver ? "scale-105 ring-2 ring-cyan-400 rounded-xl" : ""}`}
                    draggable={!isTouchDevice}
                    onDragStart={!isTouchDevice ? (e) => handleImageDragStart(e, idx) : undefined}
                    onDragOver={!isTouchDevice ? (e) => handleImageDragOver(e, idx) : undefined}
                    onDragEnter={!isTouchDevice ? (e) => handleImageDragEnter(e, idx) : undefined}
                    onDragLeave={!isTouchDevice ? (e) => handleImageDragLeave(e, idx) : undefined}
                    onDrop={!isTouchDevice ? (e) => handleImageDragDrop(e, idx) : undefined}
                    onDragEnd={!isTouchDevice ? handleImageDragEnd : undefined}
                    onTouchStart={isTouchDevice ? (e) => handleTouchStart(e, idx) : undefined}
                    onTouchMove={isTouchDevice ? (e) => handleTouchMove(e) : undefined}
                    onTouchEnd={isTouchDevice ? (e) => handleTouchEnd(e) : undefined}
                  >
                    {isFile ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${idx}`}
                        className="w-full h-28 md:h-32 object-cover rounded-xl border border-stone-200 shadow-sm group-hover:shadow-md transition-all duration-200"
                      />
                    ) : (
                      <div className="w-full h-28 md:h-32 flex items-center justify-center text-xs text-gray-400 border border-stone-200 rounded-xl bg-stone-50">
                        Invalid file
                      </div>
                    )}

                    {/* Index badge */}
                    <div className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md ${
                      idx === 0 ? "bg-cyan-700 text-white" : "bg-black/50 text-white"
                    }`}>
                      {idx + 1}
                    </div>

                    {/* Main photo label */}
                    {idx === 0 && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <span className="block text-center text-[10px] font-bold bg-cyan-700/80 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                          Main Photo
                        </span>
                      </div>
                    )}

                    {/* Remove button */}
                    {!imagesUploaded && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRemoveImage(idx); }}
                        type="button"
                        className={`absolute -top-2 -right-2 w-6 h-6 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-110 cursor-pointer transition-all duration-200 ${
                          isTouchDevice ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                        title="Remove image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}


      {/* ── EMPTY STATE ── */}
      {count === 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center">
            <Camera className="w-7 h-7 text-stone-400" />
          </div>
          <p className="text-gray-600 text-sm md:text-base font-semibold">No images selected yet</p>
          <p className="text-xs text-gray-400">Choose at least 5 clear, high-quality photos to continue</p>
        </div>
      )}


      {/* ── TIP CARD ── */}
      {count > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-100/80 flex items-center justify-center flex-shrink-0">
              <Info className="w-3.5 h-3.5 text-sky-500" />
            </div>
            <h3 className="font-semibold text-gray-950 text-base md:text-lg">Tips</h3>
          </div>
          <div className="p-5 md:p-6">
            <ul className="flex flex-col gap-2.5">
              {[
                "The first image (marked \"Main Photo\") will be your primary listing photo.",
                `To rearrange, ${isTouchDevice ? "long-press and drag an image onto another to swap positions" : "drag and drop images onto each other to swap positions"}.`,
                "Make sure all photos are clear and high-quality before uploading.",
                "Images cannot be reordered or updated after a successful upload.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-500 leading-relaxed">
                  <span className="w-5 h-5 flex-shrink-0 rounded-full bg-sky-100 text-sky-600 font-bold text-[10px] flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
};

export default Step4_UploadImages;