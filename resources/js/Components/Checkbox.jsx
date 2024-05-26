export default function Checkbox({ className = '', id , ...props }) {
    return (
        <input
            {...props}
            id={id}
            key={id}
            type="checkbox"
            className={
                'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ' +
                className
            }
        />
    );
}
