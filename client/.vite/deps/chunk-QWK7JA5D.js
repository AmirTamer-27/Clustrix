import {
  DefaultPropsProvider_default,
  GlobalStyles_default,
  capitalize,
  defaultTheme_default,
  identifier_default,
  require_prop_types,
  unstable_memoTheme,
  useDefaultProps,
  useEnhancedEffect_default
} from "./chunk-AN55UUGQ.js";
import {
  require_jsx_runtime
} from "./chunk-4YSNPC3B.js";
import {
  require_react
} from "./chunk-AM4NN4A5.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/@mui/material/esm/GlobalStyles/GlobalStyles.js
var import_prop_types = __toESM(require_prop_types(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function GlobalStyles(props) {
  return (0, import_jsx_runtime.jsx)(GlobalStyles_default, {
    ...props,
    defaultTheme: defaultTheme_default,
    themeId: identifier_default
  });
}
true ? GlobalStyles.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: import_prop_types.default.oneOfType([import_prop_types.default.array, import_prop_types.default.func, import_prop_types.default.number, import_prop_types.default.object, import_prop_types.default.string, import_prop_types.default.bool])
} : void 0;

// node_modules/@mui/material/esm/zero-styled/index.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);

// node_modules/@mui/material/esm/utils/memoTheme.js
var memoTheme = unstable_memoTheme;
var memoTheme_default = memoTheme;

// node_modules/@mui/material/esm/DefaultPropsProvider/DefaultPropsProvider.js
var React = __toESM(require_react(), 1);
var import_prop_types2 = __toESM(require_prop_types(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function DefaultPropsProvider(props) {
  return (0, import_jsx_runtime3.jsx)(DefaultPropsProvider_default, {
    ...props
  });
}
true ? DefaultPropsProvider.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types2.default.node,
  /**
   * @ignore
   */
  value: import_prop_types2.default.object.isRequired
} : void 0;
function useDefaultProps2(params) {
  return useDefaultProps(params);
}

// node_modules/@mui/material/esm/utils/capitalize.js
var capitalize_default = capitalize;

// node_modules/@mui/utils/esm/useForkRef/useForkRef.js
var React2 = __toESM(require_react(), 1);
function useForkRef(...refs) {
  const cleanupRef = React2.useRef(void 0);
  const refEffect = React2.useCallback((instance) => {
    const cleanups = refs.map((ref) => {
      if (ref == null) {
        return null;
      }
      if (typeof ref === "function") {
        const refCallback = ref;
        const refCleanup = refCallback(instance);
        return typeof refCleanup === "function" ? refCleanup : () => {
          refCallback(null);
        };
      }
      ref.current = instance;
      return () => {
        ref.current = null;
      };
    });
    return () => {
      cleanups.forEach((refCleanup) => refCleanup?.());
    };
  }, refs);
  return React2.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = void 0;
      }
      if (value != null) {
        cleanupRef.current = refEffect(value);
      }
    };
  }, refs);
}

// node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

// node_modules/@mui/utils/esm/useControlled/useControlled.js
var React3 = __toESM(require_react(), 1);
function useControlled(props) {
  const {
    controlled,
    default: defaultProp,
    name,
    state = "value"
  } = props;
  const {
    current: isControlled
  } = React3.useRef(controlled !== void 0);
  const [valueState, setValue] = React3.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  if (true) {
    React3.useEffect(() => {
      if (isControlled !== (controlled !== void 0)) {
        console.error([`MUI: A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
      }
    }, [state, name, controlled]);
    const {
      current: defaultValue
    } = React3.useRef(defaultProp);
    React3.useEffect(() => {
      if (!isControlled && JSON.stringify(defaultProp) !== JSON.stringify(defaultValue)) {
        console.error([`MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
      }
    }, [JSON.stringify(defaultProp)]);
  }
  const setValueIfUncontrolled = React3.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}

// node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js
var React4 = __toESM(require_react(), 1);
function useEventCallback(fn) {
  const ref = React4.useRef(fn);
  useEnhancedEffect_default(() => {
    ref.current = fn;
  });
  return React4.useRef((...args) => (
    // @ts-expect-error hide `this`
    (0, ref.current)(...args)
  )).current;
}
var useEventCallback_default = useEventCallback;

export {
  useForkRef,
  ownerDocument,
  useControlled,
  useEventCallback_default,
  memoTheme_default,
  useDefaultProps2 as useDefaultProps,
  capitalize_default
};
//# sourceMappingURL=chunk-QWK7JA5D.js.map
