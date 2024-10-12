/**
 * Examines the content-type header of an HTTP request and returns a string indicating the type of content: 'json', 'text', or 'audio'.
 * @param headers An instance of the Headers object containing HTTP headers.
 * @returns 'json', 'text', or 'audio' based on the content-type header value.
 */
export function checkContentType(headers: Headers): 'json' | 'text' | 'audio' | 'image' | 'video' | undefined {
  const contentType = headers.get('content-type');

  if (contentType) {
    if (contentType.includes('application/json')) {
      return 'json';
    } else if (contentType.includes('text/plain')) {
      return 'text';
    } else if (contentType.includes('audio/wav') || contentType.includes('audio/mp3')) {
      return 'audio';
    } else if (contentType.includes('image/*') || contentType.includes('image/*')) {
      return 'image';
    }else if (contentType.includes('video/*') || contentType.includes('video/*')) {
      return 'video';
    } else if (contentType.includes('audio/*') || contentType.includes('audio/*')) {
      return 'audio';
    }
  }

  // Return undefined if content-type does not match any expected types
}