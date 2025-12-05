import { create } from 'zustand'

interface User {
  id: number
  email: string
  full_name: string
  is_active: boolean
}

interface Beach {
  id: number
  name: string
  description?: string
  latitude: number
  longitude: number
  region?: string
  country: string
  risk_level: string
  last_survey_date?: string
}

interface Campaign {
  id: number
  name: string
  description?: string
  status: string
  beach_id?: number
  start_date?: string
  end_date?: string
  volunteers_needed: number
  volunteers_registered: number
}

interface Task {
  id: number
  title: string
  description?: string
  status: string
  priority: string
  campaign_id?: number
  assigned_to?: number
  due_date?: string
}

interface AppState {
  // User
  user: User | null
  token: string | null
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => void

  // Beaches
  beaches: Beach[]
  setBeaches: (beaches: Beach[]) => void
  addBeach: (beach: Beach) => void
  updateBeach: (id: number, beach: Partial<Beach>) => void
  removeBeach: (id: number) => void

  // Campaigns
  campaigns: Campaign[]
  setCampaigns: (campaigns: Campaign[]) => void
  addCampaign: (campaign: Campaign) => void
  updateCampaign: (id: number, campaign: Partial<Campaign>) => void
  removeCampaign: (id: number) => void

  // Tasks
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (id: number, task: Partial<Task>) => void
  removeTask: (id: number) => void

  // UI State
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  selectedRiskFilter: string
  setSelectedRiskFilter: (filter: string) => void
}

export const useStore = create<AppState>((set) => ({
  // User
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null }),

  // Beaches
  beaches: [],
  setBeaches: (beaches) => set({ beaches }),
  addBeach: (beach) => set((state) => ({ beaches: [...state.beaches, beach] })),
  updateBeach: (id, beach) => set((state) => ({
    beaches: state.beaches.map((b) => (b.id === id ? { ...b, ...beach } : b)),
  })),
  removeBeach: (id) => set((state) => ({
    beaches: state.beaches.filter((b) => b.id !== id),
  })),

  // Campaigns
  campaigns: [],
  setCampaigns: (campaigns) => set({ campaigns }),
  addCampaign: (campaign) => set((state) => ({ campaigns: [...state.campaigns, campaign] })),
  updateCampaign: (id, campaign) => set((state) => ({
    campaigns: state.campaigns.map((c) => (c.id === id ? { ...c, ...campaign } : c)),
  })),
  removeCampaign: (id) => set((state) => ({
    campaigns: state.campaigns.filter((c) => c.id !== id),
  })),

  // Tasks
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, task) => set((state) => ({
    tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t)),
  })),
  removeTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id),
  })),

  // UI State
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  selectedRiskFilter: 'all',
  setSelectedRiskFilter: (filter) => set({ selectedRiskFilter: filter }),
}))

