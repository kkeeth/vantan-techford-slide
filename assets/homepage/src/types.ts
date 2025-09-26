// サービス情報の型定義
export type Service = {
  id: string
  title: string
  description: string
  icon: string
}

// スキル情報の型定義
export type Skill = {
  id: string
  name: string
  level: number // 1-5
  category: 'frontend' | 'backend' | 'other'
}

// プロジェクト情報の型定義
export type Project = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  url?: string
}

// お問い合わせフォームの型定義
export type ContactForm = {
  name: string
  email: string
  message: string
}