"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Navigation } from "./_components/navigation";
import { Auth } from "@/components/providers/auth-provider";
import { redirect } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { Navbar } from "./_components/navbar";
import { cn } from "@/lib/utils";
import { SearchCommand } from "@/components/search-command";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useContext(Auth);
  const panelRef = useRef<ImperativePanelHandle>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const collapsePanel = () => {
    const panel = panelRef.current;
    if (panel) {
      panel.collapse();
      setIsCollapsed(true);
    }
  };
  const expandPanel = () => {
    const panel = panelRef.current;
    if (panel) {
      panel.expand();
      setIsCollapsed(false);
    }
  };

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-[100vh]">
      <ResizablePanel
        id="nav"
        ref={panelRef}
        defaultSize={25}
        minSize={18}
        maxSize={30}
        className="h-[100vh]"
        collapsible
      >
        <Navigation collapsePanel={collapsePanel} />
      </ResizablePanel>
      <ResizableHandle withHandle className={cn(isCollapsed && "hidden transition-all")} />
      <ResizablePanel defaultSize={75}>
        <main className="flex h-[100vh] w-full flex-col overflow-y-scroll">
          <Navbar isCollapsed={isCollapsed} expandPanel={expandPanel} />
          <div className="mt-20">
            <SearchCommand />
            {children}
          </div>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MainLayout;
