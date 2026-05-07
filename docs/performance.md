# Performance Changes

This project was updated to improve loading behavior and reduce unnecessary bundle cost.

## Files Changed

- [src/pages/404.tsx](../src/pages/404.tsx): replaced the static image with `next/image`.
- [src/views/produk/index.tsx](../src/views/produk/index.tsx): replaced the product card image with `next/image`.
- [src/views/DetailProduct/index.tsx](../src/views/DetailProduct/index.tsx): replaced the detail image with `next/image`.
- [src/components/layouts/Appshell/index.tsx](../src/components/layouts/Appshell/index.tsx): kept `Roboto` from `next/font` and loaded `Navbar` with `next/dynamic`.
- [src/pages/\_app.tsx](../src/pages/_app.tsx): added Google Analytics with `next/script`.

## Notes

- Google Analytics reads the tracking ID from `NEXT_PUBLIC_GA_ID`.
- Add the Lighthouse screenshot to this document after running an audit locally.
