import React from 'react';

const InputField = React.forwardRef(({ type = 'text', placeholder, icon: Icon, className = '', error, ...rest }, ref) => {
    const inputClasses = `w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-xl transition duration-200 outline-none ${error ? 'border-red-500' : 'focus:border-exza-purple focus:ring-1 focus:ring-exza-purple'} ${className}`;
    
    return (
        <div className="relative mb-4">
            {Icon && (
                <Icon className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            )}
            <input 
                type={type} 
                placeholder={placeholder} 
                className={inputClasses}
                ref={ref}
                {...rest}
            />
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>
    );
});

export default InputField;