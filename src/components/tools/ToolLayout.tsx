import { ReactNode } from 'react';
import RelatedTools from './sections/RelatedTools';
import ToolsCTA from './ToolsCTA';

interface ToolLayoutProps {
  children: ReactNode;
  hideRelatedTools?: boolean;
  hideCTA?: boolean;
}

export default function ToolLayout({ 
  children, 
  hideRelatedTools = false,
  hideCTA = false 
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {children}
      {!hideRelatedTools && <RelatedTools />}
      {!hideCTA && <ToolsCTA />}
    </div>
  );
}
