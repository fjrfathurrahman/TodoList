import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Bell, BookOpen, CalendarRange, ChartNoAxesCombined, FileText, Folder, Folders, Info, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Projects',
        url: '/dashboard/todos',
        icon: Folders,
    },
    {
        title: 'Aktifitas',
        url: '/dashboard/activities',
        icon: ChartNoAxesCombined,
    },
    {
        title: 'Kalender',
        url: '/dashboard/calender',
        icon: CalendarRange,
    },
];

const centerNavItems: NavItem[] = [
    {
        title: 'Notifikasi',
        url: '/dashboard/notifications',
        icon: Bell,
    },
    {
        title: 'Laporan',
        url: '/dashboard/reports',
        icon: FileText,
    },
    {
        title: 'Info',
        url: '/dashboard/info',
        icon: Info,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain title="Menu Utama" items={mainNavItems} />
                <NavMain title="Lainnya" items={centerNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
