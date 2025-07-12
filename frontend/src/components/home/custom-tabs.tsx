"use client"

import React from "react"

import { useState } from "react"

interface CustomTabsProps {
  children: React.ReactNode
}

interface TabsListProps {
  children: React.ReactNode
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  activeTab?: string
}

export function CustomTabs({ children }: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState("browse")

  return (
    <div className="w-full">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab } as any)
        }
        return child
      })}
    </div>
  )
}

export function CustomTabsList({
  children,
  activeTab,
  setActiveTab,
}: TabsListProps & { activeTab?: string; setActiveTab?: (tab: string) => void }) {
  return (
    <div className="flex space-x-2 mb-6">
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TabsTriggerProps>(child)) {
          return React.cloneElement(child, {
            isActive: child.props.value === activeTab,
            onClick: () => setActiveTab?.(child.props.value),
          })
        }
        return child
      })}
    </div>
  )
}

// @ts-ignore
export function CustomTabsTrigger({ value, children, isActive, onClick }: TabsTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        isActive ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  )
}

export function CustomTabsContent({ value, children, activeTab }: TabsContentProps) {
  if (value !== activeTab) return null
  return <div>{children}</div>
}
