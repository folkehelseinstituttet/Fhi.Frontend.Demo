# FHI Page templates

## Concept

### Header and footer

Should the header and footer be global elements in app.component, and the page templates sets up the content between.

AND/OR

Should the header and footer be part of the template

## List of templates

- **Fullwidth**
  - with global header, global main menu and global footer
  - with global header brand and global footer
- **Aside**:start and **Main**
- **Main** and **Aside**:end
- **Aside**:start, **Main** and **Aside**:end

---

<table>
  <tr>
    <td style="width: 250px">Global header</td>
  </tr>
  <tr style="background-color: lightyellow">
    <td>Main <br/><br/></td>
  </tr>
  <tr>
    <td>Global footer</td>
  </tr>
</table>

---

<table>
  <tr>
    <td colspan="2">Global header</td>
  </tr>
  <tr style="background-color: lightyellow">
    <td>Aside<br/><br/></td>
    <td style="width: 182px">Main <br/><br/></td>
  </tr>
  <tr>
    <td colspan="2">Global footer</td>
  </tr>
</table>

---

<table>
  <tr>
    <td colspan="2">Global header</td>
  </tr>
  <tr style="background-color: lightyellow">
    <td style="width: 182px">Main <br/><br/></td>
    <td>Aside<br/><br/></td>
  </tr>
  <tr>
    <td colspan="2">Global footer</td>
  </tr>
</table>

---

<table>
  <tr>
    <td colspan="3">Global header</td>
  </tr>
  <tr style="background-color: lightyellow">
    <td>Aside<br/><br/></td>
    <td style="width: 115px">Main <br/><br/></td>
    <td>Aside<br/><br/></td>
  </tr>
  <tr>
    <td colspan="3">Global footer</td>
  </tr>
</table>

---
