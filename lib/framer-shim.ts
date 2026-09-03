export const ControlType = {
  Boolean: "boolean",
  Number: "number",
  String: "string",
  Enum: "enum",
  SegmentedEnum: "segmentedEnum",
  Color: "color",
  Image: "image",
  ComponentInstance: "componentInstance",
  Array: "array",
  Object: "object",
  File: "file",
  Date: "date",
  Link: "link",
  ResponsiveImage: "responsiveImage",
  Transition: "transition",
  EventHandler: "eventHandler",
  RichText: "richText",
} as const

export const RenderTarget = {
  current: () => "preview",
  canvas: "canvas",
  preview: "preview",
  export: "export",
} as const

export function addPropertyControls(_component: any, _controls: any) {
  // No-op in React / Next.js
}

export function useIsStaticRenderer() {
  return false
}
