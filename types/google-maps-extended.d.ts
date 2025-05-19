declare namespace JSX {
  interface IntrinsicElements {
    'gmp-map': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'gmp-advanced-marker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'gmpx-api-loader': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

interface Window {
  google: any;
}
