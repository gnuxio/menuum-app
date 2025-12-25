'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ProfileInfoCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}

export default function ProfileInfoCard({
  title,
  icon: Icon,
  children
}: ProfileInfoCardProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-xl border-2 border-gray-200/50 hover:shadow-xl transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
