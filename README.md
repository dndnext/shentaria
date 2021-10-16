# Shentaria

https://dndnext.ninja

A google maps like mapping tool for dnd worlds.

* [Setup](docs/setup.md)
* [State Management](docs/state-management.md)
* [Code Style](docs/code-style.md)
* [Infrastructure](docs/infrastructure.md)
* [Schemas](docs/schemas.md)

## Main Issues

- [ ] Finding good google maps like library.
> But not quite like google maps, as we don't need long/lat.
> Need ideas on how to slice input images into tiles. Though do we need tiles?
> Could probably use [React Leaflet](https://react-leaflet.js.org/).
- [ ] Find way of transitioning between layers on front end.
  - To make this easier, probably would be best to allow downloading example tile image sets to make matching it up easier
- [ ] Nice way to add points of interest.
- [ ] Move to now/github pages hosts site, with a GCP or hosted SQL backend to save costs/maintenance.
- [ ] For user avatars, can probably use a service like [DiceBear Avatars](https://avatars.dicebear.com/).
