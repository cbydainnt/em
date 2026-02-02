import { ReactNode } from "react";

export default function BlankLayout({ children }: { children: ReactNode}) {
    return (
        <div className="flex flex-col h-screen bor">
            <main className="flex-1 overflow-y-auto p-5">                
                {children}
            </main>
        </div>
    )
}