import React from 'react';

interface CardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  variant?: 'default' | 'warning';
}

export default function Card({ title, description, children, variant = 'default' }: CardProps) {
  const baseClasses = "rounded-lg shadow-lg p-6 mb-8";
  const variantClasses = {
    default: "bg-white",
    warning: "bg-red-50 border-2 border-red-200"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
