import AppWithoutSidebarLayout from '@/layouts/app/app-without-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppWithoutSidebarLayout breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppWithoutSidebarLayout>
);
