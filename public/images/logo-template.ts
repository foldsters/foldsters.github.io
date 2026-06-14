interface Props {
  primaryColor: string;
  secondaryColor: string;
  lineColor: string;
  hasBackground?: boolean;
  hasGayBackground?: boolean;
  strokeWidth?: number
}

export const LogoTemplate = ({primaryColor, secondaryColor, lineColor, hasBackground=false, hasGayBackground=false, strokeWidth=0.6}: Props) => {
  console.log(primaryColor, secondaryColor, lineColor, hasBackground);
  return (
`<svg
    class="logo"
    viewBox="0 0 130 130"
    version="1.1"
    id="logo"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs
    id="defs2">
    <linearGradient id="backgroundGradient" x1="0" y1="0" x2="0" y2="130" gradientUnits="userSpaceOnUse">
    <stop offset="0%" style="stop-color:#ffffe0;stop-opacity:1;" />
    <stop offset="100%" style="stop-color:#ffe6bd;stop-opacity:1;" />
    </linearGradient>
    <linearGradient id="gayBackgroundGradient" x1="0" y1="0" x2="130" y2="130" gradientUnits="userSpaceOnUse">
    <stop offset="0%" style="stop-color:#BFBFBF;stop-opacity:1;" />
    <stop offset="20%" style="stop-color:#CCEDF5;stop-opacity:1;" />
    <stop offset="30%" style="stop-color:#80D2F3;stop-opacity:1;" />
    <stop offset="40%" style="stop-color:#DAF38E;stop-opacity:1;" />
    <stop offset="50%" style="stop-color:#FFFFFF;stop-opacity:1;" />
    <stop offset="60%" style="stop-color:#FFE486;stop-opacity:1;" />
    <stop offset="70%" style="stop-color:#FEB4B3;stop-opacity:1;" />
    <stop offset="80%" style="stop-color:#FFD7E4;stop-opacity:1;" />
    <stop offset="100%" style="stop-color:#BFBFBF;stop-opacity:1;" />
    </linearGradient>
    <linearGradient
    id="linearGradient25258">
          <stop
    style="stop-color:${primaryColor};stop-opacity:1;"
    offset="0"
    id="stop25254" />
          <stop
    style="stop-color:${secondaryColor};stop-opacity:1;"
    offset="1"
    id="stop25256" />
        </linearGradient>
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5783"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5785"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5787"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5789"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5791"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5793"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5795"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5797"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5799"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5801"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5803"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5805"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5807"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
        <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient5809"
    x1="42.858299"
    y1="58.087139"
    x2="162.8398"
    y2="151.96205"
    gradientUnits="userSpaceOnUse" />
      <linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient26787"
    x1="70.330452"
    y1="134.36024"
    x2="87.568413"
    y2="134.36024"
    gradientUnits="userSpaceOnUse" /><linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient26789"
    x1="42.299362"
    y1="100.85493"
    x2="55.033707"
    y2="100.85493"
    gradientUnits="userSpaceOnUse" /><linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient26791"
    x1="49.675964"
    y1="108.27036"
    x2="100.5357"
    y2="108.27036"
    gradientUnits="userSpaceOnUse" /><linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient26793"
    x1="70.485748"
    y1="136.45676"
    x2="147.74596"
    y2="136.45676"
    gradientUnits="userSpaceOnUse" /><linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient26795"
    x1="107.94149"
    y1="104.33174"
    x2="160.01442"
    y2="104.33174"
    gradientUnits="userSpaceOnUse" /><linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient26797"
    x1="94.567001"
    y1="96.118179"
    x2="100.74611"
    y2="96.118179"
    gradientUnits="userSpaceOnUse" /><linearGradient
    xlink:href="#linearGradient25258"
    id="linearGradient26799"
    x1="94.715897"
    y1="91.669975"
    x2="112.19235"
    y2="91.669975"
    gradientUnits="userSpaceOnUse" /><linearGradient

    xlink:href="#linearGradient25258"
    id="linearGradient26801"
    x1="112.67626"
    y1="98.314369"
    x2="124.1411"
    y2="98.314369"
    gradientUnits="userSpaceOnUse" /><linearGradient

    xlink:href="#linearGradient25258"
    id="linearGradient26803"
    x1="118.65648"
    y1="97.104607"
    x2="128.36597"
    y2="97.104607"
    gradientUnits="userSpaceOnUse" /><linearGradient

    xlink:href="#linearGradient25258"
    id="linearGradient26805"
    x1="101.09974"
    y1="119.5504"
    x2="112.97404"
    y2="119.5504"
    gradientUnits="userSpaceOnUse" /><linearGradient

    xlink:href="#linearGradient25258"
    id="linearGradient26807"
    x1="109.60531"
    y1="119.51317"
    x2="119.35788"
    y2="119.51317"
    gradientUnits="userSpaceOnUse" /><linearGradient

    xlink:href="#linearGradient25258"
    id="linearGradient26809"
    x1="78.847923"
    y1="110.50236"
    x2="135.90387"
    y2="110.50236"
    gradientUnits="userSpaceOnUse" /><linearGradient

    xlink:href="#linearGradient25258"
    id="linearGradient26811"
    x1="75.997787"
    y1="112.87895"
    x2="83.766106"
    y2="112.87895"
    gradientUnits="userSpaceOnUse" /></defs>
    ${hasBackground ? `<rect x="0" y="0" width="130" height="130" fill="url(#backgroundGradient)" />` : ''}
    ${hasGayBackground ? `<rect x="0" y="0" width="130" height="130" fill="url(#gayBackgroundGradient)" />` : ''}
      <g
    id="layer1"
    transform="translate(-40.9888,-35.4201)"
    style="display:inline">
        <path
    style="fill:url(#linearGradient26787);fill-opacity:1.0;stroke-width:${strokeWidth};fill-rule:evenodd"
    d="m 70.330453,128.61425 17.237958,5.04716 -11.259026,6.44482 z"
    id="path5736" /><path
    style="fill:url(#linearGradient26789);fill-opacity:1.0;stroke-width:${strokeWidth};fill-rule:evenodd"
    d="m 42.299362,112.85162 7.143657,-23.993374 5.590689,10.249596 z"
    id="path5738" /><path
    style="fill:url(#linearGradient26791);fill-opacity:1.0;stroke-width:${strokeWidth};fill-rule:evenodd"
    d="m 70.48575,128.53661 -20.809785,-39.600714 15.0638,-1.552969 21.819216,17.703843 8.308385,-7.143653 5.668334,2.640043 -10.482539,9.47312 -6.134227,-2.17416 -2.329455,-2.48475 -5.668335,12.81199 2.872991,2.17416 5.901282,2.01886 0.388242,6.75542 -2.795344,-2.48476 z"
    id="path5740" /><path
    style="fill:url(#linearGradient26793);fill-opacity:1.0;stroke-width:${strokeWidth};fill-rule:evenodd"
    d="m 147.74596,150.51112 -77.26021,-21.74157 11.647268,-2.01886 3.105938,2.5624 18.946224,-3.96007 0.46589,-2.4071 3.18359,-0.54354 z"
    id="path5742" /><path
    style="fill:url(#linearGradient26795);fill-opacity:1.0;stroke-width:${strokeWidth};fill-rule:evenodd"
    d="m 128.73023,96.312497 31.28419,-37.737147 -19.41212,57.8481 7.07415,33.66468 -39.73496,-27.97596 4.86267,-0.95217 3.49418,2.25181 18.61107,-3.49418 -2.87905,-11.23655 4.14598,-3.9049 z"
    id="path5744"/><path
    style="fill:url(#linearGradient26797);fill-opacity:1.0;stroke-width:${strokeWidth};fill-rule:evenodd"
    d="m 95.050912,97.821162 -0.483907,-5.974379 5.229908,2.531203 0.949197,6.011594 z"
    id="path5746" /><path
    style="fill:url(#linearGradient26799);fill-opacity:1.0;stroke-width:${strokeWidth};fill-rule:evenodd"
    d="m 105.93879,89.073633 6.25356,2.77315 -12.1721,2.41953 -5.30435,-2.512586 z"
    id="path5748" /><path
    style="fill:url(#linearGradient26801);fill-opacity:1.0;stroke-width:${strokeWidth};fill-rule:evenodd"
    d="m 112.91821,97.50476 -0.24195,-1.544775 5.84409,1.526164 5.62075,3.182611 z"
    id="path5750" /><path
    style="fill:url(#linearGradient26803);fill-opacity:1.0;stroke-width:${strokeWidth};fill-rule:evenodd"
    d="m 118.65648,97.495572 3.73512,-3.917892 5.97437,2.587034 -3.94569,4.466826 z"
    id="path5752" /><path
    style="fill:url(#linearGradient26805);fill-opacity:1.0;stroke-width:${strokeWidth};fill-rule:evenodd"
    d="m 104.80348,122.66787 8.17056,-1.65645 -6.30939,-4.57849 -5.56491,4.39237 z"
    id="path5754" /><path
    style="fill:url(#linearGradient26807);fill-opacity:1.0;stroke-width:${strokeWidth};fill-rule:evenodd"
    d="m 116.36139,123.22622 -6.75608,-4.85767 3.10817,-2.56842 6.6444,4.98795 z"
    id="path5756" /><path
    style="fill:url(#linearGradient26809);fill-opacity:1.0;stroke-width:${strokeWidth};fill-rule:evenodd"
    d="m 103.99293,125.27145 -18.732527,3.83739 -0.605904,-6.9679 -5.806577,-2.01967 4.998707,-12.06759 6.070098,1.84501 10.664513,-9.46966 -0.757016,-6.12059 12.466346,-2.412554 0.58895,5.638511 11.49523,3.186523 4.01098,-4.414924 7.51814,8.465704 -4.08985,3.63542 2.97903,11.3607 -18.22761,3.48395 c -1.66764,-7.941 -12.47219,-4.99975 -12.57251,2.01968 z"
    id="path5758"/><path
    style="fill:url(#linearGradient26811);fill-opacity:1.0;stroke-width:${strokeWidth};fill-rule:evenodd"
    d="m 75.997791,118.16387 5.580015,-12.59909 2.188296,2.17675 -5.062649,12.4516 z"
    id="path6015"/></g>
    <g
    id="card1_1736633700.268269"
    transform="translate(1,23)"
    style="display:inline;fill:${lineColor};fill-opacity:0"><path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:square;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
    d="m 128.94172,96.25227 31.21929,-37.532331 -19.63097,57.422741 7.35081,34.33257 -60.163937,-16.88977 -11.182089,6.7716 -21.620006,-41.337449 -12.626086,13.923289 7.177844,-24.127932 15.220484,-1.297202 21.706488,17.555444 8.648001,-7.17784 -0.4324,-6.0536 11.328881,-2.767362 6.39952,2.767362 0.34593,4.15104 5.79416,1.556641 3.8916,-3.978081 5.6212,2.334961 z"
    id="path405"
    transform="translate(-41.9888,-58.4201)" />
        <path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
    d="m 82.242505,123.32052 0.02115,0.80362 0.06533,2.48262 2.594401,2.24848 -0.01596,-0.57299 -0.329955,-6.08597 -6.053602,-1.90256 -2.421441,-2.162 5.361762,-12.36665 2.5944,2.07553 5.794162,2.07552 10.809998,-9.51281 -0.951274,-6.140079 12.453124,-2.421441 0.69184,5.621202 11.50184,3.199758 3.97808,-4.496959 7.7832,8.561519 -4.15104,3.89161 2.94032,11.2424 -18.33376,3.4592 c -2.02967,-5.48427 -6.13738,-5.92367 -9.24891,-3.92525 -1.99614,1.28205 -2.7371,3.31253 -3.2907,5.91429 l -18.769631,3.8916"
    id="path1024"
    transform="translate(-41.9888,-58.4201)" />
        <path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
    d="m 78.610345,120.29372 5.10232,-12.28017"
    id="path1026"
    transform="translate(-41.9888,-58.4201)" />
        <path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
    d="m 81.580333,105.47393 5.850974,2.6261"
    id="path1028"
    transform="translate(-41.9888,-58.4201)" />
        <path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
    d="M 88.901467,107.14875 86.44709,105.08276"
    id="path1030"
    transform="translate(-41.9888,-58.4201)" />
        <path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
    d="m 95.128029,97.89539 5.275281,2.50792"
    id="path1032"
    transform="translate(-41.9888,-58.4201)" />
        <path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
    d="m 94.880896,91.982046 4.657615,2.194702"
    id="path1034"
    transform="translate(-41.9888,-58.4201)" />
        <path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
    d="m 118.56412,97.63595 5.53472,2.85384"
    id="path1036"
    transform="translate(-41.9888,-58.4201)" />
        <path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
    d="m 109.80338,118.71885 6.47011,4.54279"
    id="path1134"
    transform="translate(-41.9888,-58.4201)" />
        <path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
    d="m 104.98562,122.82478 7.95295,-1.64301"
    id="path1136"
    transform="translate(-41.9888,-58.4201)" />
        <path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
    d="m 147.65431,150.13392 -39.72723,-27.6782"
    id="path1138"
    transform="translate(-41.9888,-58.4201)" />
        <path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
    d="m 134.49905,117.62082 5.68507,-1.13222"
    id="path1140"
    transform="translate(-41.9888,-58.4201)" />
        <path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
    d="M 87.517786,133.52516 70.481221,128.5958 82.069545,126.60676"
    id="path1142"
    transform="translate(-41.9888,-58.4201)" />
        <path
    style="fill:none;fill-opacity:0;stroke:${lineColor};stroke-width:${strokeWidth};stroke-linecap:square;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
    d="M 54.846932,98.865267 49.702541,89.183465"
    id="path1144"
    transform="translate(-41.9888,-58.4201)" />
    </g>
  </svg>`); 
}