import './css/builderApp.css'
export default function BuilderApp() {

  return (
    <section className='body'>
      hello world, this is the mhrise thing
      <main>This is the main box
        <section className='gearView'>
          <div className='gear'>gear box
            <div className='weapon.select'>weapon box</div>
            <div className='armor.head.select emphasis'>head box</div>
          </div>
        </section>
      </main>
    </section>
  );
}
