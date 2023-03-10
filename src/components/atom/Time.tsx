import { format } from "date-fns"

type props = {
    dateString: string
}

export const Time = ({ dateString }:props) => {
    const date = new Date(dateString)
    return <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'yyyy/MM/dd')}</time>
}

export default  Time