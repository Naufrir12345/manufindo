import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
    blurDataURL?: string;
}

/**
 * Optimized Image component with automatic blur placeholder and lazy loading
 */
export default function OptimizedImage({
    src,
    alt,
    className = '',
    blurDataURL,
    priority = false,
    ...props
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    // Generate simple blur data URL if not provided
    const defaultBlurDataURL = blurDataURL ||
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=';

    return (
        <Image
            src={src}
            alt={alt}
            className={`${className} ${isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'
                } transition-all duration-500`}
            onLoad={() => setIsLoading(false)}
            placeholder="blur"
            blurDataURL={defaultBlurDataURL}
            priority={priority}
            quality={priority ? 90 : 75}
            {...props}
        />
    );
}
