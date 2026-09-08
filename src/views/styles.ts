import { baseCss } from './styles/base';
import { productCardCss } from './styles/productCard';
import { skeletonCss } from './styles/skeleton';
import { subpageBannerCss } from './styles/subpageBanner';
import { adminPortalCss } from './styles/adminPortal';
import { featureSuiteCss } from './styles/featureSuite';
import { editorialCss } from './styles/editorial';
import { productMatrixCss } from './styles/productMatrix';
import { productStageCss } from './styles/productStage';
import { rehubEnterpriseCss } from './styles/rehubEnterprise';
import { articleEditorCss } from './styles/articleEditor';
import { homepageWidgetsCss } from './styles/homepageWidgets';

export {
  baseCss,
  productCardCss,
  skeletonCss,
  subpageBannerCss,
  adminPortalCss,
  featureSuiteCss,
  editorialCss,
  productMatrixCss,
  productStageCss,
  rehubEnterpriseCss,
  articleEditorCss,
  homepageWidgetsCss,
};

export const storefrontCss = [
  baseCss,
  productCardCss,
  skeletonCss,
  subpageBannerCss,
  adminPortalCss,
  featureSuiteCss,
  editorialCss,
  productMatrixCss,
  productStageCss,
  rehubEnterpriseCss,
  articleEditorCss,
  homepageWidgetsCss,
].join('\n');
