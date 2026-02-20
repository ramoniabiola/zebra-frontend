import { useState, useRef } from "react"
import { X, Upload, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

const ImageGallery = ({
    imageList = [],     // unified array (URLs + File objects)
    editMode = false,
    onImageChange,
    onRemoveImage,
    onImageReorder,
    uploadProgress = 0,
    isReactivating = false
}) => {
    const [currentImg, setCurrentImg] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    // Drag and drop states
    const [draggedIndex, setDraggedIndex] = useState(null)
    const [dragOverIndex, setDragOverIndex] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [touchStartIndex, setTouchStartIndex] = useState(null)
    const [touchCurrentIndex, setTouchCurrentIndex] = useState(null)
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 })

    const dragCounter = useRef(0)
    const touchTimer = useRef(null)
    const ghost = useRef(null)
    const rafId = useRef(null)
    const boxes = useRef([])

    const totalImages = imageList.length
    const isTouchDevice =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)

    const handleNext = () => {
        if (currentImg < totalImages - 1) {
            setCurrentImg((prev) => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentImg > 0) {
            setCurrentImg((prev) => prev - 1)
        }
    }

    // ---------- Drag & Drop (Desktop) ----------
    const handleImageDragStart = (e, index) => {
        setDraggedIndex(index)
        e.dataTransfer.effectAllowed = "move"

        // Suppress the default browser ghost preview
        const emptyGhost = document.createElement("div")
        emptyGhost.style.width = "0px"
        emptyGhost.style.height = "0px"
        e.dataTransfer.setDragImage(emptyGhost, 0, 0)
    }


    const handleImageDragOver = (e, index) => {
        e.preventDefault();  // critical for onDrop to fire
        setDragOverIndex(index);
    };


    const handleImageDragEnd = () => {
        setDraggedIndex(null)
        setDragOverIndex(null)
        dragCounter.current = 0
    }

    const handleImageDragDrop = (e, dropIndex) => {
        e.preventDefault()
        e.stopPropagation()

        if (draggedIndex !== null && draggedIndex !== dropIndex) {
            onImageReorder(draggedIndex, dropIndex)
        }

        setDraggedIndex(null)
        setDragOverIndex(null)
    }

    const handleImageDragEnter = (e, index) => {
        e.preventDefault()
        dragCounter.current++
        setDragOverIndex(index)
    }

    const handleImageDragLeave = (e) => {
        e.preventDefault()
        dragCounter.current--
        if (dragCounter.current === 0) {
            setDragOverIndex(null)
        }
    }

    // ---------- Touch Drag (Mobile) ----------
    const handleTouchStart = (e, index) => {
        const touch = e.touches[0]
        setDragStartPos({ x: touch.clientX, y: touch.clientY })
        setTouchStartIndex(index)

        // Cache bounding boxes
        boxes.current = Array.from(
            document.querySelectorAll("[data-image-index]")
        ).map((el, i) => ({
            index: i,
            rect: el.getBoundingClientRect(),
        }))

        // Ghost preview
        ghost.current = e.currentTarget.cloneNode(true)
        ghost.current.style.position = "fixed"
        ghost.current.style.pointerEvents = "none"
        ghost.current.style.opacity = "0.7"
        ghost.current.style.zIndex = "9999"
        ghost.current.style.width = `${e.currentTarget.offsetWidth}px`
        ghost.current.style.height = `${e.currentTarget.offsetHeight}px`
        document.body.appendChild(ghost.current)

        touchTimer.current = setTimeout(() => {
            setIsDragging(true)
            setDraggedIndex(index)
        }, 300)
    }

    const handleTouchMove = (e) => {
        const touch = e.touches[0]

        if (ghost.current) {
            ghost.current.style.left = `${touch.clientX - 40}px`
            ghost.current.style.top = `${touch.clientY - 40}px`
        }

        if (!isDragging) {
            const deltaX = Math.abs(touch.clientX - dragStartPos.x)
            const deltaY = Math.abs(touch.clientY - dragStartPos.y)
            if (deltaX > 10 || deltaY > 10) clearTimeout(touchTimer.current)
            return
        }

        if (!rafId.current) {
            rafId.current = requestAnimationFrame(() => {
                const overBox = boxes.current.find(
                    (b) =>
                        touch.clientX >= b.rect.left &&
                        touch.clientX <= b.rect.right &&
                        touch.clientY >= b.rect.top &&
                        touch.clientY <= b.rect.bottom
                )
                if (overBox && overBox.index !== draggedIndex) {
                    setTouchCurrentIndex(overBox.index)
                    setDragOverIndex(overBox.index)
                }
                rafId.current = null
            })
        }
    }

    const handleTouchEnd = () => {
        clearTimeout(touchTimer.current)
        ghost.current?.remove()
        ghost.current = null

        if (
            isDragging &&
            touchCurrentIndex !== null &&
            touchCurrentIndex !== draggedIndex
        ) {
            onImageReorder(draggedIndex, touchCurrentIndex)
        }

        setIsDragging(false)
        setTouchStartIndex(null)
        setTouchCurrentIndex(null)
        setDraggedIndex(null)
        setDragOverIndex(null)
    }

    // ---------- Accessibility ----------
    const handleKeyReorder = (e, index) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault()
            setDraggedIndex(index)
        }
        if (draggedIndex !== null) {
            if (e.key === "ArrowLeft" && index > 0) {
                onImageReorder(draggedIndex, index - 1)
            }
            if (e.key === "ArrowRight" && index < imageList.length - 1) {
                onImageReorder(draggedIndex, index + 1)
            }
        }
    }

    // ---------- Edit Mode ----------
    if (editMode) {
        return (
            <div className="p-8 w-full">
                <h3 className="text-base lg:text-lg text-center font-semibold text-gray-900 mb-6">
                    Apartment Images ({imageList.length}/5 minimum)
                </h3>

                {imageList.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                        {imageList.map((img, idx) => {
                            const isDraggedOver = dragOverIndex === idx
                            const isDraggingThis = draggedIndex === idx

                            const src =
                                typeof img === "string"
                                    ? img
                                    : URL.createObjectURL(img)

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
                                        isDraggingThis
                                            ? "opacity-50 scale-95 z-10"
                                            : ""
                                    } ${isDraggedOver ? "scale-105" : ""}`}
                                    draggable={!isTouchDevice}
                                    onDragStart={
                                        !isTouchDevice
                                            ? (e) =>
                                                  handleImageDragStart(e, idx)
                                            : undefined
                                    }
                                    onDragOver={
                                        !isTouchDevice
                                            ? (e) => handleImageDragOver(e, idx)
                                            : undefined
                                    }
                                    onDragEnter={
                                        !isTouchDevice
                                            ? (e) =>
                                                  handleImageDragEnter(e, idx)
                                            : undefined
                                    }
                                    onDragLeave={
                                        !isTouchDevice
                                            ? (e) => handleImageDragLeave(e)
                                            : undefined
                                    }
                                    onDrop={
                                        !isTouchDevice
                                            ? (e) => handleImageDragDrop(e, idx)
                                            : undefined
                                    }
                                    onDragEnd={
                                        !isTouchDevice
                                            ? handleImageDragEnd
                                            : undefined
                                    }
                                    onTouchStart={
                                        isTouchDevice
                                            ? (e) => handleTouchStart(e, idx)
                                            : undefined
                                    }
                                    onTouchMove={
                                        isTouchDevice
                                            ? (e) => handleTouchMove(e)
                                            : undefined
                                    }
                                    onTouchEnd={
                                        isTouchDevice
                                            ? () => handleTouchEnd()
                                            : undefined
                                    }
                                >
                                    <img
                                        src={src}
                                        alt={`img-${idx}`}
                                        className="w-full h-30 object-cover rounded-lg border border-gray-200"
                                    />
                                    <button
                                        onClick={() => onRemoveImage(idx)}
                                        className={`absolute -top-2 -right-2 w-7 h-7 bg-rose-500/70 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 cursor-pointer ${
                                            isTouchDevice
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-100"
                                        }`}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <div className="absolute top-2 left-2 w-6 h-6 bg-black/50 text-white text-xs rounded-full flex items-center justify-center">
                                        {idx + 1}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 lg:p-16 text-center hover:border-cyan-400 transition-colors duration-200">
                    <div className="flex flex-col items-center">
                        <Upload className="w-10 h-10 text-gray-400 mb-4" />
                        <label className="cursor-pointer">
                            <span className="text-cyan-500 text-base hover:text-cyan-600 hover:underline font-medium">
                                Upload new images
                            </span>
                            <span className="text-gray-500 text-base"> or drag and drop</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={onImageChange}
                                className="hidden"
                            />
                        </label>
                        <p className="text-sm text-gray-400 mt-2">
                            PNG, JPG up to 10MB each
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                {isReactivating && uploadProgress > 0 && (
                    <div className="mt-4 w-full">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Uploading and reactivating...</span>
                            <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Tips */}
                <div className="mt-8 space-y-4">
                    <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
                        <p className="text-sm lg:text-base text-sky-700 leading-6">
                            <span className="font-medium">Tip:</span> The first
                            image will be your main listing photo. To rearrange
                            images,{" "}
                            {isTouchDevice
                                ? "then drag it onto another image to swap their positions"
                                : "simply drag and drop one image onto another to swap their positions"}
                            . A minimum of <b>5</b> images is required and a
                            maximum of <b>15</b> images is allowed.
                        </p>
                    </div>
                </div>

                {imageList.length > 15 && ( 
                    <div className="p-2 bg-rose-50 border border-rose-200 rounded-xl mt-4"> 
                        <p className="text-sm lg:text-base text-rose-700 leading-6"> <span className="font-medium">Warning: </span> 
                            You have exceeded the maximum limit of <b>15</b> images. Currently you have <b>{imageList.length}</b> images.
                        </p>
                    </div>
                )}

                {imageList.length < 5 && ( 
                    <div className="py-2 px-4 bg-amber-50 border border-amber-200 rounded-xl mt-4"> 
                        <p className="text-sm lg:text-base text-amber-700 leading-6"> <span className="font-medium">Warning: </span> 
                            You need at least <b>5</b> images to reactivate the listing. Currently you have <b>{imageList.length}</b> images. 
                        </p> 
                    </div> 
                )}
            </div>
        )
    }

    

    // ---------- View Mode ----------
    return (
        <div
            className="relative w-full h-[280px] md:h-[320px] lg:h-[360px] overflow-hidden mb-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(${currentImg * -100}%)`,
                }}
            >
                {imageList.map((image, index) => {
                    const optimizedUrl =
                        typeof image === "string" && image.includes("/upload/")
                            ? image.replace("/upload/", "/upload/f_auto,q_auto/")
                            : typeof image === "string"
                            ? image
                            : URL.createObjectURL(image)

                    return (
                        <img
                            key={index}
                            src={optimizedUrl}
                            alt={`apartment-${index}`}
                            className="min-w-full flex-shrink-0 h-full object-cover"
                        />
                    )
                })}
            </div>
            {isHovered && currentImg > 0 && (
                <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white opacity-90 p-2 rounded-full shadow"
                >
                    <ChevronLeft
                        strokeWidth={3}
                        className="w-6 h-6 text-gray-400"
                    />
                </button>
            )}
            {isHovered && currentImg < totalImages - 1 && (
                <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white opacity-90 p-2 rounded-full shadow"
                >
                    <ChevronRight
                        strokeWidth={3}
                        className="w-6 h-6 text-gray-400"
                    />
                </button>
            )}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm font-bold px-3 py-[4px] rounded">
                {currentImg + 1} / {totalImages}
            </div>
        </div>
    )
}

export default ImageGallery
