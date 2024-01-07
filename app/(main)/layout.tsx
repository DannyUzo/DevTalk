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
    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
      <ResizablePanel
        id="nav"
        ref={panelRef}
        defaultSize={20}
        minSize={15}
        maxSize={30}
        className="h-full"
        collapsible
      >
        <Navigation collapsePanel={collapsePanel} />
      </ResizablePanel>
      <ResizableHandle withHandle className={cn(isCollapsed && "hidden")} />
      <ResizablePanel defaultSize={75}>
        <main className="flex h-full w-full flex-col ">
          <Navbar isCollapsed={isCollapsed} expandPanel={expandPanel} />
          <div>{children}</div>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MainLayout;
