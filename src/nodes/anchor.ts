import { Group } from './group'
import { Context } from '../context/context'
import { getAttribute } from '../utils/node'

export class Anchor extends Group {
  protected async renderCore(context: Context): Promise<void> {
    await super.renderCore(context)

    const href = getAttribute(this.element, context.styleSheets, 'href')
    if (href) {
      const box = this.getBoundingBox(context)
      const scale = context.pdf.internal.scaleFactor
      const ph = context.pdf.internal.pageSize.getHeight()

      context.pdf.link(scale*(box[0] * context.transform.sx + context.transform.tx),
                       scale*(ph - box[1] * context.transform.sy - context.transform.ty), scale*context.transform.sx*box[2], scale*context.transform.sy*box[3], { url: href })
    }
  }
}
