"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PulseMark from "./pulse-mark";

const Navbar = () => {
    return (
        <div className="px-4 lg:px-16 py-4 flex justify-between items-center border-b-2 border-foreground bg-card/70 backdrop-blur-sm sticky top-0 z-10">
            <Link href={'/'}>
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-primary">
                        <PulseMark className="h-6 w-6" markColor="hsl(var(--primary-foreground))" lineColor="hsl(var(--accent))" />
                    </div>
                    <h1 className="text-lg font-display font-bold tracking-tight">
                        CURA <span className="text-accent">AI</span>
                    </h1>
                </div>
            </Link>
            <div className="flex gap-4">
                <Link href="/ai-doctor">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                        Talk to AI Doctor
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
