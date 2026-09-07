The vendored [shadcn/ui](https://ui.shadcn.com/) components (MIT) that this file originally shipped with have been removed — nothing in the site reaches them any more. Restore this line if any are vendored back in.

This Figma Make file includes photos from [Unsplash](https://unsplash.com) used under [license](https://unsplash.com/license).

The interactive charts under `public/viz/` are generated elsewhere and dropped in verbatim — do not edit them here. They carry two third-party dependencies of their own:

- **Weather and climate data** from [Open-Meteo](https://open-meteo.com/) ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)), fetched live in the reader's browser rather than baked into the files.
- **[D3](https://d3js.org/) v7.9.0** ([ISC](https://github.com/d3/d3/blob/main/LICENSE)), loaded from cdnjs by each chart. It is the one asset those pages do not inline.