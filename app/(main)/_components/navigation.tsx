'use client';

interface Props {
    collapsePanel: () => void;
}
export const Navigation = ({collapsePanel} : Props) => {
    return (
        <aside >
        <div className="flex h-full items-center justify-center p-6">
          <span onClick={collapsePanel} className="font-semibold">Sidebar</span>

        </div>
        </aside>
    )
}