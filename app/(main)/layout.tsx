'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Navigation } from "./_components/navigation";
import { Auth } from "@/components/providers/auth-provider"
import { redirect } from "next/navigation";
import { useContext, useRef } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useContext(Auth);
    const panelRef = useRef<ImperativePanelHandle>(null);

    const collapsePanel = () => {
        const panel = panelRef.current;
        if (panel) {
          panel.collapse();
        }
      }; 

    if(!isAuthenticated){
      return redirect("/");
    }


  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-full"
    >
      <ResizablePanel id="nav" ref={panelRef} defaultSize={25} minSize={10} maxSize={32} className="h-full" collapsible >
        <Navigation collapsePanel={collapsePanel}/>
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-slate-400"/>
      <ResizablePanel defaultSize={75}>
        <main className="flex h-full items-center justify-center p-6">
          {children}
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MainLayout;
