import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '../lib/cn';

import type {
  ComponentPropsWithoutRef,
  KeyboardEvent,
  ReactNode,
  RefObject,
} from 'react';

type SelectPlacement = 'top' | 'bottom' | 'auto';

interface SelectProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'defaultValue' | 'onChange'
> {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

interface SelectTriggerProps extends ComponentPropsWithoutRef<'button'> {
  placeholder?: string;
}

interface SelectContentProps extends ComponentPropsWithoutRef<'div'> {
  placement?: SelectPlacement;
}

interface SelectItemProps extends ComponentPropsWithoutRef<'div'> {
  value: string;
  disabled?: boolean;
  textValue?: string;
}

interface SelectInputProps extends ComponentPropsWithoutRef<'input'> {
  name: string;
}

interface SelectItemData {
  label: ReactNode;
  textValue: string;
  disabled: boolean;
}

interface SelectContextValue {
  id: string;
  value: string;
  open: boolean;
  disabled: boolean;
  activeValue: string | null;
  items: Map<string, SelectItemData>;
  rootRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  setOpen: (open: boolean) => void;
  setActiveValue: (value: string | null) => void;
  registerItem: (value: string, item: SelectItemData) => void;
  unregisterItem: (value: string) => void;
  getEnabledValues: () => string[];
  selectValue: (value: string) => void;
  close: () => void;
}

const MENU_GAP = 4;
const VIEWPORT_PADDING = 8;
const MAX_MENU_HEIGHT = 240;

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('Select components must be used within Select.');
  }

  return context;
}

export function Select({
  value,
  onValueChange,
  disabled = false,
  children,
  className = '',
  ...props
}: SelectProps) {
  const id = useId();

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const [items, setItems] = useState(() => new Map<string, SelectItemData>());

  const registerItem = useCallback(
    (itemValue: string, item: SelectItemData) => {
      setItems((previous) => {
        const current = previous.get(itemValue);

        if (
          current &&
          current.label === item.label &&
          current.textValue === item.textValue &&
          current.disabled === item.disabled
        ) {
          return previous;
        }

        const next = new Map(previous);
        next.set(itemValue, item);
        return next;
      });
    },
    [],
  );

  const unregisterItem = useCallback((itemValue: string) => {
    setItems((previous) => {
      if (!previous.has(itemValue)) return previous;

      const next = new Map(previous);
      next.delete(itemValue);
      return next;
    });
  }, []);

  const getEnabledValues = useCallback(() => {
    const elements = contentRef.current?.querySelectorAll<HTMLElement>(
      '[role="option"]:not([aria-disabled="true"])',
    );

    return Array.from(elements ?? [])
      .map((element) => element.dataset.value)
      .filter((value): value is string => value !== undefined);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const selectValue = useCallback(
    (nextValue: string) => {
      if (disabled || items.get(nextValue)?.disabled) return;

      onValueChange(nextValue);
      close();
    },
    [disabled, items, onValueChange, close],
  );

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, [open]);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return (
    <SelectContext.Provider
      value={{
        id,
        value,
        open,
        disabled,
        activeValue,
        items,
        rootRef,
        triggerRef,
        contentRef,
        setOpen,
        setActiveValue,
        registerItem,
        unregisterItem,
        getEnabledValues,
        selectValue,
        close,
      }}
    >
      <div
        {...props}
        ref={rootRef}
        className={cn('relative w-fit min-w-28', className)}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  placeholder,
  className = '',
  onClick,
  onKeyDown,
  ...props
}: SelectTriggerProps) {
  const {
    id,
    value,
    open,
    disabled,
    activeValue,
    items,
    triggerRef,
    setOpen,
    setActiveValue,
    getEnabledValues,
    selectValue,
    close,
  } = useSelectContext();

  const selected = items.get(value);

  const openMenu = () => {
    const enabled = getEnabledValues();

    setActiveValue(enabled.includes(value) ? value : (enabled[0] ?? null));
    setOpen(true);
  };

  const moveActive = (step: number) => {
    const enabled = getEnabledValues();
    if (enabled.length === 0) return;

    const current = enabled.indexOf(activeValue ?? '');
    const next = (current + step + enabled.length) % enabled.length;

    setActiveValue(enabled[next]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'Escape':
        if (open) {
          event.preventDefault();
          close();
        }
        break;

      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();

        if (!open) {
          openMenu();
        } else {
          moveActive(event.key === 'ArrowDown' ? 1 : -1);
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();

        if (!open) {
          openMenu();
        } else if (activeValue !== null) {
          selectValue(activeValue);
        }
        break;

      case 'Tab':
        if (open) setOpen(false);
        break;

      case 'Home':
      case 'End': {
        if (!open) break;

        event.preventDefault();

        const enabled = getEnabledValues();
        setActiveValue(
          event.key === 'Home'
            ? (enabled[0] ?? null)
            : (enabled[enabled.length - 1] ?? null),
        );
        break;
      }
    }
  };

  return (
    <button
      {...props}
      ref={triggerRef}
      type='button'
      disabled={disabled || props.disabled}
      role='combobox'
      aria-haspopup='listbox'
      aria-expanded={open}
      aria-controls={open ? id : undefined}
      aria-activedescendant={
        open && activeValue !== null
          ? `${id}-item-${encodeURIComponent(activeValue)}`
          : undefined
      }
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented) handleKeyDown(event);
      }}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        if (open) {
          setOpen(false);
        } else {
          openMenu();
        }
      }}
      className={cn(
        'bg-card border-border flex h-9 w-full items-center',
        'justify-between gap-3 rounded-md border-2 shadow',
        'text-end text-sm font-semibold disabled:opacity-50',
        className,
      )}
    >
      <span className='px-3'>{selected?.label ?? placeholder}</span>
      {open ? <ChevronUp className='w-5' /> : <ChevronDown className='w-5' />}
    </button>
  );
}

export function SelectContent({
  placement = 'auto',
  className = '',
  children,
  style,
  ...props
}: SelectContentProps) {
  const { id, open, triggerRef, contentRef, activeValue } = useSelectContext();

  const [direction, setDirection] = useState<'top' | 'bottom'>(
    placement === 'top' ? 'top' : 'bottom',
  );
  const [maxHeight, setMaxHeight] = useState(MAX_MENU_HEIGHT);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const content = contentRef.current;

    if (!trigger || !content) return;

    const rect = trigger.getBoundingClientRect();

    const bottomSpace = Math.max(
      0,
      window.innerHeight - rect.bottom - VIEWPORT_PADDING - MENU_GAP,
    );
    const topSpace = Math.max(0, rect.top - VIEWPORT_PADDING - MENU_GAP);

    const menuHeight = Math.min(content.scrollHeight, MAX_MENU_HEIGHT);

    let nextDirection: 'top' | 'bottom' =
      placement === 'top' ? 'top' : 'bottom';

    if (placement === 'auto') {
      nextDirection =
        bottomSpace < menuHeight && topSpace > bottomSpace ? 'top' : 'bottom';
    }

    setDirection(nextDirection);
    setMaxHeight(
      Math.min(
        MAX_MENU_HEIGHT,
        nextDirection === 'top' ? topSpace : bottomSpace,
      ),
    );
  }, [placement, triggerRef, contentRef]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, updatePosition, children]);

  useEffect(() => {
    if (!open) return;

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open || activeValue === null) return;

    const element = Array.from(
      contentRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ??
        [],
    ).find((element) => element.dataset.value === activeValue);

    if (!element) return;

    const content = contentRef.current;
    if (!content) return;

    const top = element.offsetTop;
    const bottom = top + element.offsetHeight;

    if (top < content.scrollTop) {
      content.scrollTop = top;
    } else if (bottom > content.scrollTop + content.clientHeight) {
      content.scrollTop = bottom - content.clientHeight;
    }
  }, [open, activeValue, contentRef]);

  return (
    <div
      {...props}
      ref={contentRef}
      id={id}
      role='listbox'
      hidden={!open}
      style={{
        ...style,
        maxHeight: open ? maxHeight : undefined,
      }}
      className={cn(
        'scrollbar-thin scrollbar-thumb-primary absolute z-50 w-full space-y-1 overflow-y-auto',
        'border-border bg-card/20 rounded-md border-2 p-1 shadow-lg backdrop-blur-md',
        direction === 'top' ? 'bottom-full mb-1' : 'top-full mt-1',
        !open ? 'hidden' : '',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SelectItem({
  value: itemValue,
  disabled = false,
  textValue,
  children,
  className = '',
  onMouseEnter,
  onClick,
  ...props
}: SelectItemProps) {
  const {
    id,
    value,
    activeValue,
    setActiveValue,
    selectValue,
    registerItem,
    unregisterItem,
  } = useSelectContext();

  const label =
    textValue ?? (typeof children === 'string' ? children : itemValue);

  useEffect(() => {
    registerItem(itemValue, {
      label,
      textValue: label,
      disabled,
    });

    return () => {
      unregisterItem(itemValue);
    };
  }, [itemValue, label, disabled, registerItem, unregisterItem]);

  const selected = itemValue === value;
  const active = itemValue === activeValue;

  return (
    <div
      {...props}
      id={`${id}-item-${encodeURIComponent(itemValue)}`}
      role='option'
      data-value={itemValue}
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        if (!event.defaultPrevented && !disabled) {
          setActiveValue(itemValue);
        }
      }}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) {
          selectValue(itemValue);
        }
      }}
      className={cn(
        'cursor-pointer rounded px-3 py-2 text-sm font-semibold',
        disabled
          ? 'cursor-not-allowed opacity-40'
          : active
            ? 'ring-primary ring-2'
            : '',
        selected ? 'bg-primary/80 text-primary-foreground' : '',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SelectInput({ name, ...props }: SelectInputProps) {
  const { value } = useSelectContext();

  return (
    <input {...props} type='text' value={value} readOnly name={name} hidden />
  );
}
