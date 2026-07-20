'use client'

import { CalculatorTool } from './CalculatorTool'
import { DocGeneratorTool } from './DocGeneratorTool'
import type { ToolKind } from '@/lib/content/tools/_type'

/**
 * Client entry point that mounts the right interactive island for a tool page.
 * The server <ToolPage> renders all the SEO copy; this renders only the tool.
 */
export function ToolInteractive({ slug, kind }: { slug: string; kind: ToolKind }) {
  if (kind === 'calculator') return <CalculatorTool slug={slug} />
  if (kind === 'docgen') return <DocGeneratorTool slug={slug} />
  return null
}
