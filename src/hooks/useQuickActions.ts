import { useState, useEffect, useCallback } from 'react';
import { quickActionsConfig, defaultQuickActions, type QuickAction } from '@/config/quickActionsConfig';

interface UseQuickActionsReturn {
  activeActions: QuickAction[];
  availableActions: QuickAction[];
  addAction: (actionId: string) => void;
  removeAction: (actionId: string) => void;
  resetToDefaults: () => void;
  isActionActive: (actionId: string) => boolean;
  canAddMoreActions: boolean;
}

const MAX_QUICK_ACTIONS = 6;
const STORAGE_KEY_PREFIX = 'quickActions_';

export const useQuickActions = (
  pageKey: string,
  systemType: 'rtgs' | 'csd' | 'cms' | 'common' = 'common'
): UseQuickActionsReturn => {
  const storageKey = `${STORAGE_KEY_PREFIX}${pageKey}`;
  
  // Get available actions for the current system and common actions
  const availableActions = [
    ...quickActionsConfig[systemType] || [],
    ...quickActionsConfig.common
  ];

  // Get default actions for this page
  const defaultActions = defaultQuickActions[pageKey] || defaultQuickActions.default;
  
  const [activeActionIds, setActiveActionIds] = useState<string[]>(() => {
    // Try to load from localStorage
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : defaultActions;
      } catch {
        return defaultActions;
      }
    }
    return defaultActions;
  });

  // Save to localStorage whenever activeActionIds changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(activeActionIds));
  }, [activeActionIds, storageKey]);

  // Get active actions with their full configuration
  const activeActions = activeActionIds
    .map(id => availableActions.find(action => action.id === id))
    .filter((action): action is QuickAction => action !== undefined);

  const addAction = useCallback((actionId: string) => {
    setActiveActionIds(prev => {
      if (prev.includes(actionId) || prev.length >= MAX_QUICK_ACTIONS) {
        return prev;
      }
      return [...prev, actionId];
    });
  }, []);

  const removeAction = useCallback((actionId: string) => {
    setActiveActionIds(prev => prev.filter(id => id !== actionId));
  }, []);

  const resetToDefaults = useCallback(() => {
    setActiveActionIds(defaultActions);
  }, [defaultActions]);

  const isActionActive = useCallback((actionId: string) => {
    return activeActionIds.includes(actionId);
  }, [activeActionIds]);

  const canAddMoreActions = activeActionIds.length < MAX_QUICK_ACTIONS;

  return {
    activeActions,
    availableActions,
    addAction,
    removeAction,
    resetToDefaults,
    isActionActive,
    canAddMoreActions
  };
};