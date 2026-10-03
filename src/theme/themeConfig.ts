import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#8A4F2C',
    colorPrimaryHover: '#A06037',
    colorPrimaryActive: '#733E22',
    colorLink: '#8A4F2C',
    colorLinkHover: '#A06037',
    colorTextHeading: '#1A1613',
    colorText: '#3D3835',
    colorTextSecondary: '#78716C',
    colorBgBase: '#FFFFFF',
    borderRadius: 8,
    fontFamily: 'var(--font-bevietnam), "Be Vietnam Pro", system-ui, -apple-system, sans-serif',
    fontSize: 15,
  },
  components: {
    Button: {
      controlHeight: 46,
      borderRadius: 9999,
      colorPrimary: '#8A4F2C',
      colorPrimaryHover: '#9E6139',
      colorPrimaryActive: '#733E22',
      primaryColor: '#FFFFFF',
      primaryShadow: '0 8px 20px -4px rgba(138, 79, 44, 0.35)',
      fontWeight: 600,
      paddingContentHorizontal: 24,
      defaultBorderColor: '#D5BEA8',
      defaultColor: '#5C311C',
      defaultGhostBorderColor: '#8A4F2C',
      fontFamily: 'var(--font-bevietnam), "Be Vietnam Pro", sans-serif',
    },
    Input: {
      controlHeight: 46,
      borderRadius: 8,
      activeBorderColor: '#8A4F2C',
      hoverBorderColor: '#B89370',
      fontFamily: 'var(--font-bevietnam), "Be Vietnam Pro", sans-serif',
    },
    Select: {
      controlHeight: 46,
      borderRadius: 8,
      fontFamily: 'var(--font-bevietnam), "Be Vietnam Pro", sans-serif',
    },
    Modal: {
      borderRadiusLG: 16,
      headerBg: '#FFFFFF',
      contentBg: '#FFFFFF',
    },
    Card: {
      borderRadiusLG: 16,
    },
    Tabs: {
      colorPrimary: '#8A4F2C',
      itemHoverColor: '#A06037',
      itemSelectedColor: '#8A4F2C',
      fontFamily: 'var(--font-bevietnam), "Be Vietnam Pro", sans-serif',
    },
    Pagination: {
      colorPrimary: '#8A4F2C',
      itemActiveBg: '#8A4F2C',
      borderRadius: 8,
      fontFamily: 'var(--font-bevietnam), "Be Vietnam Pro", sans-serif',
    }
  },
};

export default theme;

