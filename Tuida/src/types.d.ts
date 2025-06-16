declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  // add more env variables here if needed
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
} 