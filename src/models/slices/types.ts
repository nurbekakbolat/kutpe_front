type Tabs = 'home' | 'about' | 'nearby' | 'history' | 'place' | 'auth'

interface ActiveTab { 
    activeTab: Tabs
}

interface User {
    is_superuser: boolean;
    username: string;
    email?: string;
    first_name: string;
    last_name: string;
    phone_number: string;
}

export type { ActiveTab, Tabs, User }