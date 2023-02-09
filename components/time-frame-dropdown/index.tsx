import { TopTimeFrame } from "@/types";
import { Dropdown } from "../dropdown";

const TIME_FRAMES = {
    'long_term': 'All time',
    'medium_term': 'Last 6 months',
    'short_term': 'Last 4 weeks'
}
const DROPDOWN_ITEMS = Object.values(TIME_FRAMES);
const getTimeFrameFromString = (readableTime: string) => {
    if(readableTime === DROPDOWN_ITEMS[0]) return 'long_term';
    if(readableTime === DROPDOWN_ITEMS[1]) return 'medium_term';
    return 'short_term';
}

export default function TimeFrameDropdown({
    onChange, defaultActive
}: {
    onChange: (timeFrame: TopTimeFrame) => void;
    defaultActive: TopTimeFrame;
}) {
    return(
        <Dropdown 
            items={DROPDOWN_ITEMS}
            onChange={timeFrame => onChange(getTimeFrameFromString(timeFrame as TopTimeFrame))}
            defaultSelected={TIME_FRAMES[defaultActive]}
        />
    )
}