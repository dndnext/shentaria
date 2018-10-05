# Code Style

Will use prettier to format code, with pretty-quick on a husky hook to format when commiting.

Prefer async over promise for all things async.

Typescript for fun and banter, with a sane tslint config.

We will use [atomic design](https://blog.bitsrc.io/simplify-complex-ui-by-implementing-the-atomic-design-in-react-with-bit-f4ad116ec8db) for splitting components, with the extension to include `wrappers`, which are simple components wrapping other components in the consumers (see [State Management](state-management.md) for more) that they need. This way we don't tie presentational components and the data they depend on.
