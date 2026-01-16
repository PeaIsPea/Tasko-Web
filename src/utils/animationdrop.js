import { defaultDropAnimationSideEffects } from '@dnd-kit/core'

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5'
      }
    }
  })
}

export default dropAnimation