export interface NavigationItem {
    id: string
    label: string
    href: string
    icon?: string
    external?: boolean
  }

  export interface SocialLink {
    platform: string
    url: string
    icon?: string
  }

  export interface CustomSection {
    id: string
    title: string
    description?: string
    enabled: boolean
    order: number
    content?: string
  }

  export interface ProjectShowcase {
    enabled: boolean
    layout: 'grid' | 'list' | 'carousel'
    itemsPerPage: number
    showFilters: boolean
    categories: string[]
  }

  export interface SeoSettings {
    title: string
    description: string
    keywords: string[]
    ogImage?: string
    twitterCard?: string
    googleSiteVerification?: string
    robotsTxt?: string
  }

  export interface AnalyticsSettings {
    googleAnalytics?: {
      measurementId: string
      enableDemographics?: boolean
    }
    plausible?: {
      domain: string
    }
    umami?: {
      websiteId: string
      url: string
    }
  }

  export interface GeneralSettings {
    title: string
    description: string
    author: string
    email: string
    location?: string
    avatar?: string
    navigation: NavigationItem[]
    socialLinks: SocialLink[]
    customSections: CustomSection[]
    seo: SeoSettings
    analytics: AnalyticsSettings
  }

  export interface LayoutSettings {
    type: 'default' | 'minimal' | 'custom'
    header: {
      sticky: boolean
      transparent: boolean
      height: number
    }
    footer: {
      enabled: boolean
      showSocialLinks: boolean
      showNavigation: boolean
      copyright?: string
    }
    sidebar?: {
      enabled: boolean
      position: 'left' | 'right'
      width: number
    }
  }

  export interface PagesSettings {
    pages: {
      home: boolean
      about: boolean
      projects: boolean
      blog: boolean
      contact: boolean
      resume: boolean
      utilities: boolean
      guestbook: boolean
      dashboard: boolean
    }
    projectShowcase: ProjectShowcase
    customPages: {
      [key: string]: {
        title: string
        slug: string
        content: string
        enabled: boolean
      }
    }
  }

  export interface ThemeSettings {
    theme: 'light' | 'dark' | 'system'
    primaryColor: string
    secondaryColor?: string
    accentColor?: string
    fontFamily: 'inter' | 'manrope' | 'system'
    borderRadius: 'none' | 'small' | 'medium' | 'large'
    enableAnimation: boolean
    customCss?: string
    darkMode: {
      primaryColor?: string
      secondaryColor?: string
      accentColor?: string
    }
  }

  export interface IntegrationSettings {
    github?: {
      token: string
      username: string
      pinnedRepos?: string[]
      showContributions?: boolean
    }
    googleAnalytics?: {
      measurementId: string
    }
    smtp?: {
      host: string
      port: number
      user: string
      password: string
    }
    vercel?: {
      token: string
      teamId?: string
    }
    contentful?: {
      spaceId: string
      accessToken: string
    }
    sanity?: {
      projectId: string
      dataset: string
      token: string
    }
  }

  export interface Settings {
    general: GeneralSettings
    layout: LayoutSettings
    pages: PagesSettings
    theme: ThemeSettings
    integrations: IntegrationSettings
  }

