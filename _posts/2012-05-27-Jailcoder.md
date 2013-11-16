---
layout: "post"
permalink: "/page/Jailcoder"
title: "Quick Note about Jailcoder"
preamble: |
  Just tried using [Jailcoder](http://jailcoder.com/) to build and run iOS apps on my iPad.
  So here is a quick how to.
---


- Jailbreak the iDevice.
- Install AppSync from cydia.hackulo.us repo.
- Install [Jailcoder](http://jailcoder.com/) and patch your Xcode.
- After creating, patch your Project.
- Build the app for the iDevice.
- Click run and your app should run.

---

But when app doesn't run:

### _Xcode cannot run using the selected device._ No provisioned iOS devices are available with a compatible iOS version.

- Make sure the deployment target is set to the right version on your device.
- Go to the organizer and click "use for development" on your device. There is no need to sign in.
- Try disconnecting and reconnecting your iDevice.

### Build failed with something about no certificate.

Make sure the project is patched.

### App doesn't install and complains something about installd.

Make sure AppSync is installed.














