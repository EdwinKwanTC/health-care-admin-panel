'use client'

import Input from '@/app/Base/input'
import Card from '@/app/Base/Card'
import Content from '@/app/Base/Content'

export default function Home() {
    return (
        <div className="p-2">
            <Input label="This is a label" />
            <Card title="some date">
                <Content />
            </Card>
        </div>
    )
}
