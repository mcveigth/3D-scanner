import { Button } from 'antd'
import React from 'react'

export const ScrollToTop = () => {
  const handleClick = () => {
    window.scrollTo(0, 0)
    console.log('')
  }

  return (
    <Button
      type="link"
      style={{
        position: 'fixed',
        right: 20,
        bottom: 20,
      }}
      onClick={handleClick}
    >
      ⤴️ Scroll To Top
    </Button>
  )
}
