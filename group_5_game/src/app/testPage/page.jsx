// testPage component from next docs

import Link from 'next/link'
import React from 'react'
 
export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/">About</Link>
    </div>
  )
}