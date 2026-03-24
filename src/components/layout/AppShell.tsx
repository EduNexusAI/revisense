import { ReactNode, ElementType } from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';

interface NavItem {
  label: string;
  icon: ElementType;
  path: string;
  badge?: number;
}

interface AppShellProps {
  children: ReactNode;
  navItems: NavItem[];
}

export const AppShell = ({ children, navItems }: AppShellProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar items={navItems} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>

      <BottomNav items={navItems.slice(0, 5)} />
    </div>
  );
};
