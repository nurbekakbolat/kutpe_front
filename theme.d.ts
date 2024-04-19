import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    paper: Palette['primary'];
  }
  interface PaletteOptions {
    paper: PaletteOptions['primary'];
  }
}