import axios from "axios";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Button, Form, Input } from "reactstrap";
import rehypeRaw from "rehype-raw";
import { createTopic } from "../services/topic.service";

const Dummy = () => {
    const handleSubmit = e => {
        e.preventDefault()

        const file = e.target['img'].files[0]
        const body = {
            name: "aaa",
            description: "aksjdkjwjdkwjkjd"
        }

        createTopic(4,body,file).then(response => {
            console.log(response.data)
        })

    };

    return (
        <div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {`เขียนโปรแกรมที่แปลงเวลาหน่วยวินาที ให้เป็นชั่วโมง นาที และวินาที เช่น 3661 วินาทีก็คือ 1 ชั่วโมง 1 นาที 1 วินาที\n\n<u>ข้อมูลนำเข้า</u>  \nมีแค่บรรทัดเดียวเป็นเวลาในหน่วยวินาที เป็นจำนวนเต็มบวก\n\n<u>ข้อมูลส่งออก</u>  \nแสดงผลลัพธ์ออกมาในหน่วยชั่วโมง นาที และวินาที\n\n## Example 1\n<pre class=\"output\">\nsecond(s): _3661_\n3661 => 1 hour(s): 1 minute(s): 1 second(s)\n</pre>\n\n## Example 2\n<pre class=\"output\">\nsecond(s): <b style="color:red;">1235</b>\n1235 => 0 hour(s): 20 minute(s): 35 second(s)\n</pre>\n\n## Example 2\n<pre class=\"output\">\nsecond(s): _9843_\n9843 => 2 hour(s): 44 minute(s): 3 second(s)\n</pre>`}
            </ReactMarkdown>
            <Form onSubmit={e => handleSubmit(e)}>
                <Input accept="image/*" type="file" id="img" />
                <Button type="submit">Click</Button>
            </Form>
        </div>
    );
};

export default Dummy;
