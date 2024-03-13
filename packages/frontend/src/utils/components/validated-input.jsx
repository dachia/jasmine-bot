import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form';

export function ValidatedInput({ errors, control, name, component: Component, ...props }) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Component
            {...field}
            {...props}
            error={!!errors[name]}
            helperText={errors[name] ? errors[name].message : ''}
          />
        )}
      />
      {/* {errors[name] && <p>{errors[name].message}</p>} */}
    </>
  );
}
ValidatedInput.propTypes = {
  errors: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
};