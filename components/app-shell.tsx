import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="overflow-hidden">
			<SidebarProvider className="relative h-svh">
				<AppSidebar />
				<SidebarInset className="min-w-0 md:m-2 md:rounded-3xl md:border md:border-border/50 md:shadow-md overflow-hidden bg-card/30">
					<AppHeader />
					<div className="flex flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden p-4 md:p-6 min-w-0">
						{children}
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
