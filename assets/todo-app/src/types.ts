export type Priority = 'high' | 'medium' | 'low';
export type Category = 'work' | 'personal' | 'shopping' | 'other';

export type Task = {
  id: number
  name: string
  isDone: boolean
  priority: Priority
  category: Category
  createdAt: Date
}

export type Tasks = Task[];

export type FilterType = "ALL" | "TODO" | "DONE"

// 表示用の定数
export const PRIORITY_LABELS = {
  high: '高',
  medium: '中', 
  low: '低'
} as const;

export const CATEGORY_LABELS = {
  work: '仕事',
  personal: 'プライベート',
  shopping: '買い物',
  other: 'その他'
} as const;

export const PRIORITY_COLORS = {
  high: '#ff4757',    // 赤
  medium: '#ffa502',  // オレンジ
  low: '#2ed573'      // 緑
} as const;