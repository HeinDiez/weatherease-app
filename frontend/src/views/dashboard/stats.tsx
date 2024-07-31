import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import WindIcon from '@/components/icons/windIcon'
import RainIcon from "@/components/icons/rainIcon";
import PressureIcon from '@/components/icons/pressureIcon'
import UvIcon from "@/components/icons/uvIcon";

const stats = [
    { id: 1, name: 'Wind Speed', stat: '12km/h', icon: WindIcon, change: '2kl/h', changeType: 'decrease' },
    { id: 2, name: 'Rain Chance', stat: '24%', icon: RainIcon, change: '10%', changeType: 'increase' },
    { id: 3, name: 'Pressure', stat: '720 hpa', icon: PressureIcon, change: '32 hpa', changeType: 'increase' },
    { id: 4, name: 'Uv Index', stat: '2,3', icon: UvIcon, change: '0,3', changeType: 'decrease' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Stats() {
    return (
        <div>
            <div className='flex justify-between '>
                <h3 className="text-base font-semibold leading-6 text-gray-900">Today overview</h3>

                <span className='text-sm text-primary cursor-pointer'>More Details</span>
            </div>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {stats.map((item) => (
                    <div
                        key={item.id}
                        className="relative overflow-hidden rounded-lg bg-gray-50 px-4 pb-12 pt-5 sm:px-6 sm:pt-6"
                    >
                        <dt>
                            <div className="absolute rounded-md p-3">
                                <item.icon aria-hidden="true" className="h-7 w-7 text-primary"/>
                            </div>
                            <p className="ml-16 truncate text-sm font-light text-gray-500">{item.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-6 sm:pb-7 gap-3">
                            <p className="text-4xl font-semibold text-gray-900">{item.stat}</p>
                            <p
                                className={classNames(
                                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                                    'ml-2 flex items-baseline text-sm font-semibold',
                                )}
                            >
                                {item.changeType === 'increase' ? (
                                    <ChevronUpIcon aria-hidden="true"
                                                 className="h-5 w-5 flex-shrink-0 self-center text-green-500"/>
                                ) : (
                                    <ChevronDownIcon aria-hidden="true"
                                                   className="h-5 w-5 flex-shrink-0 self-center text-red-500"/>
                                )}

                                <span
                                    className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                                {item.change}
                            </p>
                            <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                <div className="text-sm">
                                    <a href="#" className="font-light text-gray-500 hover:text-primary-500">
                                        View all<span className="sr-only"> {item.name} stats</span>
                                    </a>
                                </div>
                            </div>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
