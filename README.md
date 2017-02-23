# URL Cache Demo
This project demonstrates a scenario that causes iOS to cache HTTP responses when using NativeScript.

Key to this problem:

- Target URL uses a "cache busting" parameter, making each URL request unique
- Response size is larger than 1KB (not sure what actual threshold is, but small requests do not seem to get cached)
- Requests are made on a frequent interval, so fsCacheData grows and iOS does not have ability to auto-purge until app is closed